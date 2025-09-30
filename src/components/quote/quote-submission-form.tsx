'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/context/wallet-context';
import { FormState, submitQuote } from '@/lib/actions';
import { Loader2, Send } from 'lucide-react';

const quoteSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters.').max(280, 'Quote must be 280 characters or less.'),
  author: z.string().max(50, 'Author name must be 50 characters or less.').optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Submit Wisdom
    </Button>
  );
}

export default function QuoteSubmissionForm() {
  const { toast } = useToast();
  const { walletAddress } = useWallet();

  const [formState, formAction] = useFormState<FormState, FormData>(submitQuote, null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      quote: '',
      author: '',
    },
  });

  useEffect(() => {
    if (!formState) return;

    if (formState.type === 'error') {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: formState.message,
      });

      if (formState.fieldErrors) {
        for (const fieldName in formState.fieldErrors) {
          const key = fieldName as keyof QuoteFormValues;
          const message = formState.fieldErrors[key]?.[0];
          if (message) {
            form.setError(key, { type: 'server', message });
          }
        }
      }
    }

    if (formState.type === 'success') {
      toast({
        title: 'Success!',
        description: formState.message,
      });
      form.reset();
    }
  }, [formState, toast, form]);

  const actionWithWallet = (formData: FormData) => {
    if (walletAddress) {
      formData.append('walletAddress', walletAddress);
      formAction(formData);
    } else {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Wallet is not connected.',
      });
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Submit Today's Wisdom</CardTitle>
        <CardDescription>Share a quote that will echo through the oasis. One submission per degen, per day.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={actionWithWallet}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'The greatest risk is not taking one.'" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Satoshi Nakamoto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}