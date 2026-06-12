type Props = {
  title: string
  description?: string
  icon?: React.ReactNode
}

export default function EmptyState({ title, description, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      {icon && <div className="mb-3 text-gray-300">{icon}</div>}
      <p className="font-medium text-gray-700">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-gray-400">{description}</p>
      )}
    </div>
  )
}
