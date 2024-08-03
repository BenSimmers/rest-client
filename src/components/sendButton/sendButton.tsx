import { SendButtonProps } from '../../utils/types'

export const SendButton: React.FunctionComponent<SendButtonProps> = ({
  onClick
}) => (
  <button
    onClick={onClick}
    className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-4"
  >
    Send
  </button>
)
