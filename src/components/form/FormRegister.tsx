"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldGroup, FieldError, FieldLabel, FieldSet, FieldContent } from "../ui/field";
import { User, IdCard, Mail, Lock, Eye, EyeOff } from "lucide-react";

const FormRegister = ({ state, action, status }: { state: any, action: any, status: boolean }) => {
  const [visibility, setVisibility] = useState<string | null>(null);

  const handleVisibility = (fieldName: string) => {
    setVisibility((prev) => (prev === fieldName ? null : fieldName));
  };

  return (
    <form id='form-register' action={action} method="POST">
      <FieldSet>
        <FieldGroup className="@container/field-group">
          <Field data-invalid={!!state?.error?.username}>
            <FieldContent className="relative">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="JhonDoe311024"
                  aria-invalid={!!state?.error?.username}
                  disabled={status}
                  maxLength={20}
                  required
                />
                <InputGroupAddon>
                  <IdCard />
                </InputGroupAddon>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.username}
              </FieldError>
            </FieldContent>
          </Field>
          <Field className="space-y-4 md:space-y-0" orientation='responsive' data-invalid={!!state?.error?.firstName || !!state?.error?.lastName}>
            <FieldContent data-invalid={!!state?.error?.firstName} className="relative">
              <FieldLabel htmlFor="firstName">Name depan</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="firstName"
                  name="firstName"
                  placeholder="Jhon"
                  aria-invalid={!!state?.error?.firstName}
                  disabled={status}
                  maxLength={20}
                  required
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.firstName}
              </FieldError>
            </FieldContent>
            <FieldContent className="relative">
              <FieldLabel htmlFor="lastName">Nama belakang</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  aria-invalid={!!state?.error?.lastName}
                  disabled={status}
                  maxLength={20}
                  required
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.lastName}
              </FieldError>
            </FieldContent>
          </Field>
          <Field data-invalid={!!state?.error?.email}>
            <FieldContent className="relative">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jhon311024@contoh.com"
                  aria-invalid={!!state?.error?.email}
                  disabled={status}
                  maxLength={50}
                  required
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.email}
              </FieldError>
            </FieldContent>
          </Field>
          <Field data-invalid={!!state?.error?.password}>
            <FieldContent className="relative">
              <FieldLabel htmlFor="password">Passowrd</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  type={visibility === "password" ? "text" : "password"}
                  placeholder="**********"
                  aria-invalid={!!state?.error?.password}
                  disabled={status}
                  maxLength={20}
                  required
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupButton
                  size="icon-sm"
                  onClick={() => handleVisibility("password")}
                >
                  {visibility === "password" ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.password}
              </FieldError>
            </FieldContent>
          </Field>
          <Field data-invalid={!!state?.error?.confirmPassword}>
            <FieldContent className="relative">
              <FieldLabel htmlFor="confirmPassword">Konfirmasi Passowrd</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={visibility === "confirmPassword" ? "text" : "password"}
                  placeholder="**********"
                  aria-invalid={!!state?.error?.confirmPassword}
                  disabled={status}
                  maxLength={20}
                  required
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupButton
                  size="icon-sm"
                  onClick={() => handleVisibility("confirmPassword")}
                >
                  {visibility === "confirmPassword" ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroup>
              <FieldError className="text-xs absolute -bottom-5">
                {state?.error?.confirmPassword}
              </FieldError>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form >
  )
}

export default FormRegister
