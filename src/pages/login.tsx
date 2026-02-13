import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigate } from 'react-router'
import z from 'zod'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { ControlledInput } from '../components/ui/controlled-input'
import { useAuth } from '../contexts/auth-provider'

const formSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
})

type TSchemaInput = z.input<typeof formSchema>
type TSchemaOutput = z.output<typeof formSchema>

export function LoginPage() {
	const formId = useId()
	const methods = useForm<TSchemaInput, any, TSchemaOutput>({
		resolver: zodResolver(formSchema),
	})
	const { login, isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to="/devices" replace />
	}

	const onSubmit = async (data: TSchemaOutput) => {
		try {
			await login(data.username, data.password)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="mx-auto w-full max-w-sm flex items-center justify-center h-screen">
			<FormProvider {...methods}>
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Faça login para acessar a plataforma.</CardDescription>
					</CardHeader>
					<CardContent>
						<form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<ControlledInput name="username" label="username" placeholder="example" required />
								<ControlledInput name="password" type="password" label="Password" required />
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button form={formId} type="submit" className="w-full">
							Login
						</Button>
					</CardFooter>
				</Card>
			</FormProvider>
		</div>
	)
}
