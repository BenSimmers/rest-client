import { StatusInputProps } from '../../utils/types'

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
