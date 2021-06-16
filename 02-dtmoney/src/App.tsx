import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from "react-modal";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

//root é a div presente no index.html, 'falando' assim qual o root da nossa aplicação
Modal.setAppElement('#root');

export function App() {
  //o modal por padrão sempre vem fechado --> useSate(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />

      <NewTransactionModal 
        isOpen = {isNewTransactionModalOpen}
        onRequestClose = {handleCloseNewTransactionModal}
      />
        
      <GlobalStyle />
    </TransactionsProvider>
  );
}