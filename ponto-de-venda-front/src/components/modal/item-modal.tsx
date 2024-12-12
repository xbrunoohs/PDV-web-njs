import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Customer, ItemType, Products } from '@/types/type'
import { createCustomer } from '@/services/customer'
import { createProduct } from '@/services/products'

type ItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: Customer | Products;
  itemType: ItemType;
}

export function ItemModal({ isOpen, onClose, item, itemType }: ItemModalProps) {
  const { register, handleSubmit, reset } = useForm<Customer>({
    defaultValues: item || {}
  });
  const { 
    register: registerProduct, 
    handleSubmit: handleSubmitProduct, 
    reset: resetProduct 
  } = useForm<Products>({
    defaultValues: item || {}
  });
  
  useEffect(() => {
    reset(item || {});
    resetProduct(item || {});
  }, [item, reset, resetProduct]);

  const onSubmitCustomer = handleSubmit((data) => {
    createCustomer(data).then((response) => {
      if(response.status === 201) {
        window.location.reload();
      }
    }).catch((error) => {
      console.error(error);
    })
    onClose();
  });

  const onSubmitProduct = handleSubmitProduct((data) => {
    createProduct(data).then((response) => {
      if  (response.status === 201) window.location.reload();
    }).catch((error) => {
      console.error(error);
    })
    onClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {item ? 'Editar' : 'Adicionar'} {itemType === 'cliente' ? 'Cliente' : 'Produto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={itemType === 'cliente' ? onSubmitCustomer : onSubmitProduct}>
          <div className="grid gap-6 py-4">
            {itemType === 'cliente' && (
              <>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="nome_cliente" className="text-left text-sm font-medium">Nome do Cliente</Label>
                  <Input
                    id="nome_cliente"
                    {...register("nome_cliente", { required: "Nome é obrigatório" })}
                    className="border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="cpf" className="text-left text-sm font-medium">CPF do cliente</Label>
                  <Input
                    id="cpf"
                    {...register("cpf", { required: "Cpf é obrigatório" })}
                    className="border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
              </>
            )}
            
            {itemType === 'produto' && (
              <>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="nome_produto" className="text-left text-sm font-medium">Nome do Produto</Label>
                  <Input
                    id="nome_produto"
                    type="text"
                    {...registerProduct("nome_produto", { required: "Nome do produto é obrigatório" })}
                    className="border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="preco" className="text-left text-sm font-medium">Preço do Produto</Label>
                  <Input
                    id="preco"
                    type="number"
                    {...registerProduct("preco", { required: "Informe o preço!" })}
                    className="border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-black focus:ring-2 focus:ring-black transition-all"
            >
              {item ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
