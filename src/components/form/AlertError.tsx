import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../@/components/ui/alert"

function AlertError() {
  return (
    <Alert variant="destructive">
    <Terminal className="h-8 w-4" />
    <AlertTitle>Erro ao realizar o cadastro!</AlertTitle>
    </Alert>
  )
}

export default AlertError
