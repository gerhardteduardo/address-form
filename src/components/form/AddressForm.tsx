import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../@/components/ui/form';
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

  const onSubmit = async (values: unknown) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setFormValue(data: any) 
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
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="grid grid-cols-10 gap-4 text-left">
          <FormField control={form.control} name="zipcode"
            render={({ field }) => (
              <FormItem className="lg:col-span-2 col-span-10">
                <FormLabel>CEP *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="Digite seu CEP" {...field} onChange={(event) => getCEPdata(event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="street"
            render={({ field }) => (
              <FormItem className="lg:col-span-6 col-span-10">
                <FormLabel>Rua *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="Digite a rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="housenumber"
            render={({ field }) => (
              <FormItem className="lg:col-span-2 col-span-10">
                <FormLabel>Número *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="Digite o número" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="neighborhood"
            render={({ field }) => (
              <FormItem className="lg:col-span-3 col-span-10">
                <FormLabel>Bairro *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="Digite o bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="city"
            render={({ field }) => (
              <FormItem className="lg:col-span-3 col-span-10">
                <FormLabel>Cidade *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="Digite a cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem> 
            )}
          />
          <FormField control={form.control} name="state"
            render={({ field }) => (
              <FormItem className="lg:col-span-2 col-span-10">
                <FormLabel>Estado *</FormLabel>
                <FormControl>
                  <Input className="hover:bg-green-50" placeholder="UF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="complement"
          render={({ field }) => (
            <FormItem className="lg:col-span-2 col-span-10">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input className="hover:bg-green-50" placeholder="Digite o complemento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button className="lg:col-start-9 lg:col-span-2 col-span-10" type="submit">Cadastrar</Button>
          </div>
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