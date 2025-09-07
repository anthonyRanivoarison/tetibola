const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-500 text-sm">Loading</span>
    </div>
  )
}

export default Spinner;