import nookies, { setCookie, destroyCookie, parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'

export const AUTH_COOKIE_KEY = 'dhat'

export const setAuthCookie_client = (token: string) => {
  setCookie(null, AUTH_COOKIE_KEY, token, {
    path: '/',
  })
}

export const removeAuthCookie_client = () => {
  destroyCookie(null, AUTH_COOKIE_KEY)
}

export const getAuthCookie_client = () => {
  const cookies = parseCookies()
  return cookies[AUTH_COOKIE_KEY]
}

export const setAuthCookie_server = (
  ctx: GetServerSidePropsContext,
  token: string,
) => {
  nookies.set(ctx, AUTH_COOKIE_KEY, token, { path: '/' })
}

export const removeAuthCookie_server = (ctx: GetServerSidePropsContext) => {
  nookies.destroy(ctx, AUTH_COOKIE_KEY)
}

export const getAuthCookie_server = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx)
  return cookies[AUTH_COOKIE_KEY]
}
