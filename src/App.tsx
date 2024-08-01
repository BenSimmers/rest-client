import { SetStateAction, useState } from 'react'
import './App.css'
import {
  BodyInputProps,
  HeadersInputProps,
  HTTPMethod,
  isValidProtocolTypeGuard,
  ProtocolSelectProps,
  ResponseTextareaProps,
  SendButtonProps,
  StatusInputProps,
  UrlInputProps
} from './utils/types'
import React from 'react'

export const UrlInput = ({ url, onChange }: UrlInputProps) => (
  <div className="mb-4">
    <label htmlFor="url" className="font-bold">
      URL
    </label>
    <input
      type="text"
      id="url"
      value={url}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
    />
  </div>
)

export const ProtocolSelect: React.FunctionComponent<ProtocolSelectProps> = ({
  protocol,
  onChange
}) => (
  <div className="mb-4">
    <label htmlFor="protocol" className="font-bold">
      Protocol
    </label>
    <select
      id="protocol"
      value={protocol}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
    >
      {Object.values(HTTPMethod).map((method) => (
        <option
          key={method}
          value={method}
          disabled={!isValidProtocolTypeGuard(method)}
        >
          {method}
        </option>
      ))}
    </select>
  </div>
)

const HeadersInput: React.FunctionComponent<HeadersInputProps> = ({
  headerKey,
  headerValue,
  onKeyChange,
  onValueChange,
  onAddHeader,
  headers,
  onRemoveHeader
}) => (
  <div className="mb-4">
    <label htmlFor="headers" className="font-bold">
      Headers
    </label>
    <div className="flex">
      <input
        type="text"
        placeholder="Key"
        aria-label="Key"
        aria-describedby="basic-addon2"
        value={headerKey}
        onChange={onKeyChange}
        className="w-1/3 mr-2 border border-gray-300 rounded p-2"
      />
      <input
        type="text"
        placeholder="Value"
        aria-label="Value"
        aria-describedby="basic-addon2"
        value={headerValue}
        onChange={onValueChange}
        className="w-1/3 mr-2 border border-gray-300 rounded p-2"
      />

      <div>
        <button
          type="button"
          onClick={onAddHeader}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4"
        >
          Add
        </button>
      </div>
    </div>
    <div className="mt-2">
      {Object.keys(headers).map((key) => (
        <div key={key} className="flex items-center">
          <span className="mr-2">{key}</span>
          <span>{headers[key]}</span>
          <button
            onClick={() => onRemoveHeader(key)}
            className="bg-red-500 hover:bg-red-600 text-white rounded py-1 px-2 ml-2"
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
)

export const BodyInput: React.FunctionComponent<BodyInputProps> = ({
  body,
  onChange
}) => (
  <div className="mb-4">
    <label htmlFor="body" className="font-bold">
      Body
    </label>
    <textarea
      id="body"
      rows={3}
      value={body}
      onChange={onChange}
      className="w-full border border-gray-300 rounded p-2"
    />
  </div>
)

export const SendButton: React.FunctionComponent<SendButtonProps> = ({
  onClick
}) => (
  <button
    onClick={onClick}
    className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-4"
  >
    Send
  </button>
)

export const ResponseTextarea: React.FunctionComponent<
  ResponseTextareaProps
> = ({ response }) => (
  <div className="mb-4">
    <label htmlFor="response" className="font-bold">
      Response
    </label>
    <textarea
      style={{ height: '300px', width: '100%' }}
      id="response"
      rows={3}
      value={response}
      readOnly
      className="w-full border border-gray-300 rounded p-2"
    />
  </div>
)

export const StatusInput: React.FunctionComponent<StatusInputProps> = ({
  status
}) => (
  <div className="mb-4">
    <label htmlFor="status" className="font-bold">
      Status
    </label>
    <input
      type="text"
      id="status"
      value={status}
      readOnly
      className="w-full border border-gray-300 rounded p-2"
    />
  </div>
)

const API: React.FunctionComponent = () => {
  const [url, setUrl] = useState<string>(
    'https://jsonplaceholder.typicode.com/todos'
  )
  const [protocol, setProtocol] = useState<string>(HTTPMethod.GET)
  const [response, setResponse] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [headerKey, setHeaderKey] = useState<string>('')
  const [headerValue, setHeaderValue] = useState<string>('')
  const [headers, setHeaders] = useState<{ [key: string]: string }>({})
  const [body, setBody] = useState<string>('')

  const handleAddHeader = React.useCallback(() => {
    setHeaders({ ...headers, [headerKey]: headerValue })
    setHeaderKey('')
    setHeaderValue('')
  }, [headers, headerKey, headerValue])

  const handleRemoveHeader = React.useCallback(
    (key: string) => {
      const newHeaders = { ...headers }
      delete newHeaders[key]
      setHeaders(newHeaders)
    },
    [headers]
  )

  const handleSend = React.useCallback(async () => {
    if (protocol === HTTPMethod.GET || protocol === HTTPMethod.DELETE) {
      const response = await fetch(url, {
        method: protocol,
        headers
      })
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
      setStatus(response.status.toString())
    }

    if (
      protocol === HTTPMethod.POST ||
      protocol === HTTPMethod.PUT ||
      protocol === HTTPMethod.PATCH
    ) {
      const response = await fetch(url, {
        method: protocol,
        headers,
        body
      })

      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
      setStatus(response.status.toString())
    }
  }, [url, protocol, headers, body])

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
