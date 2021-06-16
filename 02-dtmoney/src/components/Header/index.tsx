import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  //função não recebe nenhum param e não tem nenhum retorno
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt.money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}