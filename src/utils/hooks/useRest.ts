import React, { useState } from 'react'
import { HTTPMethod } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type Request = {
  id: string
  url: string
  protocol: string
  headers: { [key: string]: string }
  body: string
}

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

  const saveRequest = React.useCallback(() => {
    const request: Request = {
      id: uuidv4(),
      url,
      protocol,
      headers,
      body
    }

    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    requests.push(request)
    localStorage.setItem('requests', JSON.stringify(requests))

    setUrl('')
    setProtocol(HTTPMethod.GET)
    setHeaders({})
    setBody('')
  }, [])

  const loadRequest = React.useCallback((requestId: string) => {
    // setUrl(request.url)
    // setProtocol(request.protocol)
    // setHeaders(request.headers)
    // setBody(request.body)

    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const request = requests.find(
      (request: Request) => request.id === requestId
    )
    return request
  }, [])

  const getAllRequests = React.useCallback(() => {
    return JSON.parse(localStorage.getItem('requests') || '[]')
  }, [])

  const deleteRequest = React.useCallback((id: string) => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]')
    const newRequests = requests.filter((request: Request) => request.id !== id)
    localStorage.setItem('requests', JSON.stringify(newRequests))
  }, [])

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
    setHeaders,
    setHeaderValue,
    headers,
    body,
    setBody,
    handleAddHeader,
    handleRemoveHeader,
    handleSend,
    saveRequest,
    loadRequest,
    getAllRequests,
    deleteRequest
  }
}
