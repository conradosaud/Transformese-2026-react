'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({ id: null, nome: '', email: '' });
  
  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Filters state (demo of advanced filters)
  const [sortOrder, setSortOrder] = useState('desc');

  let debounceTimeout = useRef(null);

  const fetchClientes = async (termo = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/clientes?q=${encodeURIComponent(termo)}`);
      const data = await res.json();
      
      // Aplicar ordenação simulada se necessário
      let finalData = data;
      if (sortOrder === 'asc') {
        finalData = [...data].reverse(); // A api já traz DESC por padrão
      }

      setClientes(Array.isArray(finalData) ? finalData : []);
    } catch (error) {
      addToast('Erro ao buscar clientes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [sortOrder]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    debounceTimeout.current = setTimeout(() => {
      fetchClientes(value);
    }, 500); // 500ms debounce
  };

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const openAddModal = () => {
    setCurrentCliente({ id: null, nome: '', email: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cliente) => {
    setCurrentCliente(cliente);
    setIsModalOpen(true);
  };

  const openDeleteModal = (cliente) => {
    setCurrentCliente(cliente);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentCliente.nome) {
      addToast('O nome é obrigatório.', 'error');
      return;
    }

    try {
      const method = currentCliente.id ? 'PUT' : 'POST';
      const url = currentCliente.id ? `/api/clientes/${currentCliente.id}` : '/api/clientes';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCliente),
      });

      if (!res.ok) throw new Error('Falha na operação');

      addToast(currentCliente.id ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
      setIsModalOpen(false);
      fetchClientes(searchTerm);
    } catch (error) {
      addToast('Erro ao salvar cliente', 'error');
    }
  };

  const handleDelete = async () => {
    if (!currentCliente.id) return;
    try {
      const res = await fetch(`/api/clientes/${currentCliente.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir');
      
      addToast('Cliente excluído com sucesso!');
      setIsDeleteModalOpen(false);
      fetchClientes(searchTerm);
    } catch (error) {
      addToast('Erro ao excluir cliente', 'error');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Clientes</h1>
        <div className={styles.controls}>
          <input 
            type="text" 
            placeholder="Pesquisa instantânea..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button className={styles.addButton} onClick={openAddModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Novo Cliente
          </button>
        </div>
      </header>

      <div className={styles.filtersPanel}>
        <div className={styles.filterGroup}>
          <label>Ordem de Data</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Mais Recentes Primeiro</option>
            <option value="asc">Mais Antigos Primeiro</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Data Específica</label>
          <input type="date" title="Filtro de data ilustrativo para layout profissional" />
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            Buscando dados no banco de dados...
          </div>
        ) : clientes.length === 0 ? (
          <div className={styles.emptyState}>
            <i>📋</i>
            <h2>Nenhum cliente encontrado</h2>
            <p>Tente ajustar os filtros ou cadastrar um novo cliente.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Criado Em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td><span className={styles.badge}>#{cliente.id}</span></td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email || '-'}</td>
                  <td>{formatDate(cliente.criado_em)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => openEditModal(cliente)}>
                        ✏️
                      </button>
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => openDeleteModal(cliente)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{currentCliente.id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Nome Completo *</label>
                <input 
                  type="text" 
                  value={currentCliente.nome} 
                  onChange={(e) => setCurrentCliente({...currentCliente, nome: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <input 
                  type="email" 
                  value={currentCliente.email} 
                  onChange={(e) => setCurrentCliente({...currentCliente, email: e.target.value})}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className={styles.addButton}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p style={{marginBottom: '2rem'}}>Tem certeza que deseja apagar o cliente <strong>{currentCliente.nome}</strong>? Esta ação não pode ser desfeita.</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
              <button type="button" className={styles.addButton} style={{background: '#ef4444'}} onClick={handleDelete}>Sim, Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts Container */}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            {toast.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
