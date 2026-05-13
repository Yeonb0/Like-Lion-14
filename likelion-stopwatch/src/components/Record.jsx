function Record({ records }) {
  return (
    <section>
      {records.map((record, index) => {
        return (
          <p key={index}>
            {index + 1}.{String(Math.floor(record / 3600)).padStart(2, "0")}:
                        {String(Math.floor(record / 60)).padStart(2, "0")}:
                        {String(record % 60).padStart(2, "0")}
          </p>
        )
      })}
    </section>
  )
}

export default Record
