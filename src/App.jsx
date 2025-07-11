import { useEffect, useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import ColumnToggleButtons from './components/ColumnToggleButtons.jsx' 
import TableFilterButton from './components/TableFilterButton.jsx' 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

const initialColumns = [
  { key: 'visit_id', label: 'ID', visible: true },
  { key: 'visit_date', label: 'Data', visible: true },
  { key: 'visit_price', label: 'Koszt', visible: true },
  { key: 'patient_name', label: 'Pacjent', visible: true },
  { key: 'doctor_name', label: 'Lekarz', visible: true },
  { key: 'specialization', label: 'Specjalizacja', visible: true }
]

function App() {
  const [visits, setVisits] = useState([])
  const [columns, setColumns] = useState(initialColumns)

  // Pobierz wszystkie dane przy starcie
  useEffect(() => {
    fetchAllCols()
  }, [])

  const fetchAllCols = async () => {
    const { data, error } = await supabase
      .from('visits_details')
      .select('*')

    if (error) console.error(error)
    else setVisits(data)
  }

  // Pobierz tylko wizyty z ceną > 0
  const fetchPaidVisitsOnly = async () => {
    const { data, error } = await supabase
      .from('visits_details')
      .select('*')
      .gt('visit_price', 0)

    if (error) console.error(error)
    else setVisits(data)
  }

  const toggleColumn = (key) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const showAllColumns = () => {
    setColumns((prev) => prev.map((col) => ({ ...col, visible: true })))
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <h1 className="text-xl font-bold my-4">Wizyty</h1>

      {/*Przyciski chowania kolumn */}
      <ColumnToggleButtons
        columns={columns}
        toggleColumn={toggleColumn}
        showAllColumns={showAllColumns}
      />

      <div className="h-full overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0 border">
            <tr>
              {columns.filter(col => col.visible).map((col) => (
                <th key={col.key} className="border px-2 py-1 text-left bg-gray-200">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="overflow-scroll">
            {visits.map((visit) => (
              <tr key={visit.visit_id}>
                {columns.filter(col => col.visible).map((col) => (
                  <td key={col.key} className="border px-2 py-1">
                    {visit[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Przyciski filtrowania */}
      <div className="flex">
        <TableFilterButton
          filterFunction={fetchPaidVisitsOnly}
          name={"Tylko płatne wizyty"}
        />
        <TableFilterButton
          filterFunction={fetchAllCols}
          name={"Wszystkie wizyty"}
        />
      </div>

    </div>
  )
}

export default App
