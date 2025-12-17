'use client'

import { useState } from "react"
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Field, FieldSet, FieldGroup, FieldError, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "../ui/input-group"
import { LoginSate } from "@/app/action/auth";

const LoginForm = ({ state, action, status }: { state: LoginSate, action: any, status: boolean }) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const isError = !!state?.error?.password || !!state?.error?.username || !!state?.message

  return (
    <form id="login-form" method="POST" action={action}>
      <FieldSet>
        <FieldGroup>
          <Field data-invalid={isError} className="relative">
            <FieldLabel htmlFor="username">
              Username
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                disabled={status}
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                aria-invalid={isError}
              />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
            <FieldError className="text-xs absolute -bottom-5 left-0">
              {state?.error?.username || state?.message}
            </FieldError>
          </Field>
          <Field data-invalid={isError} className="relative">
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                disabled={status}
                id="password"
                name="password"
                placeholder="password"
                type={visibility ? "text" : "password"}
                aria-invalid={isError}
              />
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupButton onClick={handleVisibility}>
                {visibility ? <Eye /> : <EyeOff />}
              </InputGroupButton>
            </InputGroup>
            <FieldError className="text-xs absolute -bottom-5 left-0">
              {state?.error?.password || state?.message}
            </FieldError>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

export default LoginForm
