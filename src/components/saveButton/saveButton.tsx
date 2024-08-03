export interface SendButtonProps {
  onSave: () => void
}

export const SaveRequest: React.FunctionComponent<SendButtonProps> = ({
  onSave
}) => (
  <button
    onClick={onSave}
    className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-4"
  >
    Save
  </button>
)
