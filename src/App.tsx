import React, { SetStateAction } from 'react'
import './App.css'
import { useRest } from './utils/hooks/useRest'
import { UrlInput } from './components/urlInput/urlInput'
import { ProtocolSelect } from './components/protocolSelect'
import { HeadersInput } from './components/headersInput'
import { SendButton } from './components/sendButton'
import { ResponseTextarea } from './components/responseTextArea'
import { StatusInput } from './components/statusInput'
import { BodyInput } from './components/bodyInput'

const API: React.FunctionComponent = () => {
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
    handleRemoveHeader
  } = useRest()

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
        </div>
        <div>
          <ResponseTextarea response={response} />
          <StatusInput status={status} />
        </div>
      </div>
    </div>
  )
}

const App: React.FunctionComponent = () => <API />

export default App
