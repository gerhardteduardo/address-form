import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../@/components/ui/form';
import AlertSuccess from './AlertSuccess.tsx';
import AlertError from './AlertError.tsx';

const formSchema = z.object({
  zipcode: z.string().min(8, {
    message: "Digite todos os dígitos do seu CEP",
  }),
  street: z.string().min(2, {
    message: "Digite uma rua válida",
  }),
  housenumber: z.string().refine(value => !isNaN(parseInt(value)), {
    message: "Digite um número válido",
  }),
  complement: z.string().optional(),
  state: z.string().min(2, {
    message: "Digite um estado válido",
  }),
  city: z.string().min(2, {
    message: "Digite uma cidade válida",
  }),
  neighborhood: z.string().min(2, {
    message: "Digite um bairro válido",
  }),  
});

function AddressForm() 
{
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSubmit = async (values) => {
    try {
      console.log(values);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } 
    catch (error) {
      console.error("Erro:", error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  function setFormValue(data) 
  {
    const { cep, uf, localidade, logradouro, bairro } = data;
    form.setValue("zipcode", cep);
    form.setValue("state", uf);
    form.setValue("city", localidade);
    form.setValue("street", logradouro);
    form.setValue("neighborhood", bairro);
  }

  async function getCEPdata(zipCode : string) 
  {
    if (zipCode.length != 8) {
      return zipCode;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (!response.ok) {
        return null;
      }
      setFormValue(await response.json());
    } 
    catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="xl:grid xl:grid-cols-4 gap-5">
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="Digite seu CEP" {...field} onChange={(event) => getCEPdata(event.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-left xl:col-span-2">
              <FormField control={form.control} name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="Digite a rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input className="hover:bg-green-50" placeholder="Digite o complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="housenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="Digite o número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="Digite a cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem> 
                )}
              />
            </div>
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xl:w-64 text-left">
              <FormField control={form.control} name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input className="hover:bg-green-50" placeholder="Digite o bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="w-full" type="submit">CADASTRAR</Button>
      </form>
      {showSuccessMessage && (
        <AlertSuccess/>
      )}
      {showErrorMessage && (
        <AlertError/>
      )}
    </Form>
  );
}

export default AddressForm