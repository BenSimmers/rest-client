import { SetStateAction } from 'react'

export type UrlInputProps = {
  url: string
  onChange: (e: { target: { value: SetStateAction<string> } }) => void
}

export type ProtocolSelectProps = {
  protocol: string
  onChange: (e: { target: { value: SetStateAction<string> } }) => void
}

export type HeadersInputProps = {
  headerKey: string
  headerValue: string
  onKeyChange: (e: { target: { value: SetStateAction<string> } }) => void
  onValueChange: (e: { target: { value: SetStateAction<string> } }) => void
  onAddHeader: () => void
  headers: { [key: string]: string }
  onRemoveHeader: (key: string | number) => void
}

export type BodyInputProps = {
  body: string
  onChange: (e: { target: { value: SetStateAction<string> } }) => void
}

export type SendButtonProps = {
  onClick: () => void
}

export type ResponseTextareaProps = {
  response: string
}

export type StatusInputProps = {
  status: string
}
