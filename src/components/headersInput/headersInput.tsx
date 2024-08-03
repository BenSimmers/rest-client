import { HeadersInputProps } from '../../utils/types'

export const HeadersInput: React.FunctionComponent<HeadersInputProps> = ({
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
            type="button"
            className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded py-1 px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
)
