import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Trash } from 'lucide-react';

export default function FeiraVendasApp() {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pagamento, setPagamento] = useState('pix');
  const [vendas, setVendas] = useState([]);

  function adicionarVenda() {
    if (!produto || !preco || !quantidade) return;
    const novaVenda = {
      id: Date.now(),
      produto,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      total: parseFloat(preco) * parseInt(quantidade),
      pagamento
    };
    setVendas([...vendas, novaVenda]);
    setProduto('');
    setPreco('');
    setQuantidade('');
  }

  function removerVenda(id) {
    setVendas(vendas.filter(v => v.id !== id));
  }

  const totalGeral = vendas.reduce((soma, v) => soma + v.total, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Controle de Vendas - Feira</h1>

      <Card className="mb-4">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-2">
          <Input placeholder="Produto" value={produto} onChange={e => setProduto(e.target.value)} />
          <Input placeholder="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} />
          <Input placeholder="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
          <Select value={pagamento} onValueChange={setPagamento}
