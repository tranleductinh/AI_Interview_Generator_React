
const HistoryHeader = ({handleDeleteAll, handleSearch}) => {
  
  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Interview History
      </h2>
      <div className='flex gap-4'>
        <input onChange={(e) => handleSearch(e.target.value)} className='flex-1 px-4 py-2 text-foreground text-[16px] placeholder:text-muted-foreground border border-input rounded-lg bg-background' placeholder='Search by job title or level...'></input>
        <button onClick={() => handleDeleteAll()} className='text-[16px] text-destructive-foreground text-white bg-destructive hover:opacity-90 px-4 py-2 rounded-lg'>Delete All</button>
      </div>
    </div>
  )
}

export default HistoryHeader
