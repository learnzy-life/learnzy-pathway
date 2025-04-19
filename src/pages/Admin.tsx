
import { SendMassEmailButton } from '@/components/admin/SendMassEmailButton'

const AdminPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Controls</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Mass Email Controls</h2>
          <SendMassEmailButton />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
