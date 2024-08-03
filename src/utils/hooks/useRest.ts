import React, { useState } from 'react'
import { HTTPMethod } from '../types'

export const useRest = () => {
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

  return {
    url,
    setUrl,
    protocol,
    setProtocol,
    response,
    status,
    headerKey,
    setHeaderKey,
    headerValue,
    setHeaderValue,
    headers,
    body,
    setBody,
    handleAddHeader,
    handleRemoveHeader,
    handleSend
  }
}
