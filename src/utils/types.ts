import { ChangeEvent } from 'react'

// Common type for headers
type Headers = { [key: string]: string }

// Props for URL input component
export interface UrlInputProps {
  url: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

// Props for protocol select component
export interface ProtocolSelectProps {
  protocol: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

// Props for headers input component
export interface HeadersInputProps {
  headerKey: string
  headerValue: string
  onKeyChange: (e: ChangeEvent<HTMLInputElement>) => void
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void
  onAddHeader: () => void
  headers: Headers
  onRemoveHeader: (key: string) => void
}

// Props for body input component
export interface BodyInputProps {
  body: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

// Props for send button component
export interface SendButtonProps {
  onClick: () => void
}

// Props for response textarea component
export interface ResponseTextareaProps {
  response: string
}

// Props for status input component
export interface StatusInputProps {
  status: string
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export const isValidProtocolTypeGuard = (
  protocol: string
): protocol is HTTPMethod =>
  Object.values(HTTPMethod).includes(protocol as HTTPMethod)
