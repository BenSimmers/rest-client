import { UrlInputProps } from '../../utils/types'

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
