import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Trash } from 'lucide-react';
import logo from "./assets/logo.png"; // ✅ Importa o logo

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
    <div className="relative min-h-screen p-4 bg-gray-100 flex items-center justify-center">
      {/* Fundo com logo, 70% transparência */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-70 pointer-events-none"
        style={{ backgroundImage: `url(${logo})` }}
      />

      {/* Conteúdo em z-index acima do fundo */}
      <div className="relative max-w-3xl w-full bg-white/90 rounded-xl p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Controle de Vendas - MUNDO NERD br</h1>

        <Card className="mb-4">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-2">
            <Input placeholder="Produto" value={produto} onChange={e => setProduto(e.target.value)} />
            <Input placeholder="Preço" type="number" value={preco} onChange={e => setPreco(e.target.value)} />
            <Input placeholder="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
            <Select value={pagamento} onValueChange={setPagamento}>
              <SelectItem value="pix">Pix</SelectItem>
              <SelectItem value="dinheiro">Dinheiro</SelectItem>
              <SelectItem value="cartao">Cartão</SelectItem>
            </Select>
            <Button onClick={adicionarVenda}><Plus className="w-4 h-4 mr-2" />Adicionar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendas.map(v => (
                  <TableRow key={v.id}>
                    <TableCell>{v.produto}</TableCell>
                    <TableCell>R$ {v.preco.toFixed(2)}</TableCell>
                    <TableCell>{v.quantidade}</TableCell>
                    <TableCell>{v.pagamento}</TableCell>
                    <TableCell>R$ {v.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => removerVenda(v.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {vendas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-400">Nenhuma venda registrada.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="text-right mt-4 font-bold">
              Total Geral: R$ {totalGeral.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
