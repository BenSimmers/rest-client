import {
  HTTPMethod,
  isValidProtocolTypeGuard,
  ProtocolSelectProps
} from '../../utils/types'

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
