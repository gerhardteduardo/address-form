import { Terminal } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "../@/components/ui/alert"

function AlertSuccess() {
  return (
    <Alert>
    <Terminal className="h-8 w-4" />
    <AlertTitle>Cadastro realizado com sucesso!</AlertTitle>
    </Alert>
  )
}

export default AlertSuccess
