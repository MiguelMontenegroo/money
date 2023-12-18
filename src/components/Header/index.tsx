import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import IgniteCerto from '../../assets/IgniteCerto.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={IgniteCerto}/>
       <Dialog.Root>
        <Dialog.Trigger asChild>
        <NewTransactionButton>Nova transação</NewTransactionButton> 
        </Dialog.Trigger>
       <NewTransactionModal/>
       </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}