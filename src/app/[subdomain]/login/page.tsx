'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

// FIXME
// eslint-disable-next-line @next/next/no-async-client-component
const Login: NextPage = async () => {
  const providers = await getProviders().then((res) => {
    console.log(res, '<<<<< : provider response')
    return res
  })

  return (
    <div>
      <div>
        <Image src="/github-mark.svg" width={150} height={150} objectFit="contain" alt={'Github Logo'} />
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {/*FIXME*/}
              {/* eslint-disable-next-line smarthr/best-practice-for-button-element */}
              <button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/top/main',
                  })
                }
              >
                <span>Sign in with {provider.name}</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Login
