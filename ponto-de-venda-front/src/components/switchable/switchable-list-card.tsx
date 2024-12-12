'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Pencil } from 'lucide-react'

import { Customer, ItemType, Products } from '@/types/type'
import { ItemModal } from '../modal/item-modal'
import { deleteCustomer, getCustomers } from '@/services/customer'
import { deleteProduct, getProducts } from '@/services/products'

export default function SwitchableListCard() {
  const [customer, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Products[]>([])
  const [error, setError] = useState<string | null>(null)
  const [itemType, setItemType] = useState<ItemType>('cliente')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer>()
  const [editProduct, setEditProduct] = useState<Products>()
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleEditCustomer = (item: Customer) => {
    setEditCustomer(item)
    setIsModalOpen(true)
  }

  const handleDeleteCustomer = (item: Customer) => {
    deleteCustomer(item)
    window.location.reload()
  }

  const handleDeleteProduct = (item: Products) => {
    deleteProduct(item)
    window.location.reload()
  }

  const handleEditProduct = (item: Products) => {
    setEditProduct(item)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchCustomersAndProducts = async () => {
      setIsLoading(true)
      try {
        const customers = await getCustomers()
        const products = await getProducts()

        setIsLoading(false)
        setCustomers(customers)
        setProducts(products)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
        setIsLoading(false)
      }
    }

    fetchCustomersAndProducts()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <Card className="flex flex-col w-full h-full rounded-none border-none">
        <CardHeader className="p-4 bg-white shadow-sm">
          <CardTitle className="flex flex-row justify-center items-center space-x-2">
            <div className="flex w-full rounded-lg border border-input overflow-hidden">
              <Button
                variant={itemType === 'cliente' ? "secondary" : "ghost"}
                className="rounded-none flex-1 py-2 transition-all duration-300 hover:bg-black hover:text-white"
                onClick={() => setItemType('cliente')}
              >
                Cliente
              </Button>
              <Button
                variant={itemType === 'produto' ? "secondary" : "ghost"}
                className="rounded-none flex-1 py-2 transition-all duration-300 hover:bg-black hover:text-white"
                onClick={() => setItemType('produto')}
              >
                Produtos
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : itemType === 'cliente' ? (
            <>
              <ul className="space-y-4">
                {customer.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-row items-center w-full">
                      <div style={{marginRight: 1500}} >
                        <span className="pl-2 text-gray-800 font-semibold">{item?.nome_cliente}</span>
                      </div>
                      <div className="flex flex-row justify-end gap-3 pr-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditCustomer(item)} className="transition-all duration-200 hover:bg-white">
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" type="submit" size="icon" onClick={() => handleDeleteCustomer(item)} className="transition-all duration-200 hover:bg-red-600 hover:text-white">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6 text-white" onClick={handleAdd}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Adicionar {itemType}
              </Button>
            </>
          ) : itemType === 'produto' ? (
            <>
              <ul className="space-y-4">
                {products.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-row items-center w-full">
                      <span className="pl-2 text-gray-800 font-semibold">{item?.nome_produto}</span>
                      <div className="flex flex-row justify-end gap-3 pr-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditProduct(item)} className="transition-all duration-200 hover:bg-black">
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon"  onClick={() => handleDeleteProduct(item)} className="transition-all duration-200 hover:bg-red-600 hover:text-white">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6 bg-black hover:bg-black text-white py-3" onClick={handleAdd}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Adicione um novo {itemType}
              </Button>
            </>
          ) : itemType === 'cupom' ? (
            <>
              <Button className="w-full mt-6 bg-black hover:bg-black text-white py-3" onClick={handleAdd}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Adicione um novo {itemType}
              </Button>
            </>
          ) : (
            <p className="text-center text-gray-500">Nenhum item encontrado!</p>
          )}
        </CardContent>
      </Card>
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={itemType === 'cliente' ? editCustomer : editProduct}
        itemType={itemType}
      />
    </div>
  )
}