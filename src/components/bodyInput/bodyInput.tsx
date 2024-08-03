import { BodyInputProps } from '../../utils/types'

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
