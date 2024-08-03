import { ResponseTextareaProps } from '../../utils/types'

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
