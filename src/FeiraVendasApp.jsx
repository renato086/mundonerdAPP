import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Trash } from 'lucide-react';
import logo from "./assets/logo.png";
import { firebase } from "./firebase.js";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function FeiraVendasApp() {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pagamento, setPagamento] = useState('pix');
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vendas"), snapshot => {
      const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVendas(dados);
    });
    return () => unsubscribe();
  }, []);

  async function adicionarVenda() {
    if (!produto || !preco || !quantidade) return;
    const novaVenda = {
      produto,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      total: parseFloat(preco) * parseInt(quantidade),
      pagamento
    };
    await addDoc(collection(db, "vendas"), novaVenda);
    setProduto('');
    setPreco('');
    setQuantidade('');
  }

  async function removerVenda(id) {
    await deleteDoc(doc(db, "vendas", id));
  }

  const totalGeral = vendas.reduce((soma, v) => soma + v.total, 0);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${logo})`, opacity: 0.5 }}
    >
      <div className="max-w-3xl mx-auto bg-white/80 rounded-xl p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4">🚀Mundo Nerd br🚀</h1>

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
