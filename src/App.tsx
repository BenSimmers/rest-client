import React, { SetStateAction } from 'react'
import './App.css'
import { Request, useRest } from './utils/hooks/useRest'
import { UrlInput } from './components/urlInput/urlInput'
import { ProtocolSelect } from './components/protocolSelect'
import { HeadersInput } from './components/headersInput'
import { SendButton } from './components/sendButton'
import { ResponseTextarea } from './components/responseTextArea'
import { StatusInput } from './components/statusInput'
import { BodyInput } from './components/bodyInput'
import { Link, BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { SaveRequest } from './components/saveButton'

export const API: React.FunctionComponent = () => {
  const params = useParams()
  const sessionId = params.id

  const {
    url,
    setUrl,
    protocol,
    setProtocol,
    headerKey,
    setHeaderKey,
    headerValue,
    setHeaderValue,
    headers,
    body,
    setBody,
    response,
    status,
    handleSend,
    handleAddHeader,
    handleRemoveHeader,
    saveRequest,
    setHeaders,
    loadRequest
  } = useRest()

  React.useEffect(() => {
    if (sessionId) {
      const request = loadRequest(sessionId)
      setUrl(request.url)
      setProtocol(request.protocol)
      setHeaders(request.headers)
      setBody(request.body)
    }
  }, [sessionId])

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UrlInput
            url={url}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setUrl(e.target.value)
            }
          />
          <ProtocolSelect
            protocol={protocol}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setProtocol(e.target.value)
            }
          />
          <HeadersInput
            headerKey={headerKey}
            headerValue={headerValue}
            onKeyChange={(e: { target: { value: SetStateAction<string> } }) =>
              setHeaderKey(e.target.value)
            }
            onValueChange={(e: { target: { value: SetStateAction<string> } }) =>
              setHeaderValue(e.target.value)
            }
            onAddHeader={handleAddHeader}
            headers={headers}
            onRemoveHeader={handleRemoveHeader}
          />
          <BodyInput
            body={body}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setBody(e.target.value)
            }
          />
          <SendButton onClick={handleSend} />
          <SaveRequest onSave={saveRequest} />
        </div>
        <div>
          <ResponseTextarea response={response} />
          <StatusInput status={status} />
        </div>
      </div>
    </div>
  )
}

export const Sessions: React.FunctionComponent = () => {
  const { getAllRequests, deleteRequest } = useRest()
  const [requests, setRequests] = React.useState<Request[]>([])

  React.useEffect(() => {
    setRequests(getAllRequests())
  }, [])

  const handleDelete = (id: string) => {
    deleteRequest(id)
    setRequests(requests.filter((request) => request.id !== id))
  }

  if (!requests.length) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl text-center">No requests yet</h1>
        <Link
          type="button"
          to="/api"
          className="block w-1/4 mx-auto mt-4 p-2 bg-blue-500 text-white rounded-lg text-center"
        >
          Create a request
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <ul className="space-y-4">
        {requests.map((request: Request) => (
          <li
            key={request.id}
            className="flex justify-between items-center p-4 border rounded-lg shadow-md"
          >
            <Link to={`/sessions/${request.id}`} className="flex-grow">
              <span className={`font-bold mr-2 `}>{request.protocol}</span>
              <span>{request.url}</span>
            </Link>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(request.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <Link
        type="button"
        to="/api"
        className="block mt-2 w-max mx-auto p-2 bg-blue-500 text-white rounded-lg"
      >
        Create a request
      </Link>
    </div>
  )
}

export type Routes = '/' | '/api' | '/sessions/:id'

export type RouteProps = {
  path: string
  component: JSX.Element
}

export type NavigationProps = {
  routes: Record<Routes, RouteProps>
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  routes
}) => {
  return (
    <nav className="flex p-4 bg-gray-800">
      <Link to={routes['/'].path} className="text-white mx-2">
        Home
      </Link>
      <Link to={routes['/api'].path} className="text-white mx-2">
        API
      </Link>
    </nav>
  )
}

export const routes: Record<Routes, RouteProps> = {
  '/': { path: '/', component: <Sessions /> },
  '/api': { path: '/api', component: <API /> },
  '/sessions/:id': { path: '/sessions/:id', component: <API /> }
}

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Navigation routes={routes} />
    <Routes>
      <Route path={routes['/'].path} element={routes['/'].component} />
      <Route path={routes['/api'].path} element={routes['/api'].component} />
      <Route
        path={routes['/sessions/:id'].path}
        element={routes['/sessions/:id'].component}
      />
    </Routes>
  </BrowserRouter>
)
export default App
