import Head from 'next/head'
import CustomAlert from '../../app/Commons/CustomAlert'
import Script from 'next/script'
import Dashboard from '../../app/Pages/Dashboard'
import VIEWS from '../../app/Pages/Dashboard/Constants/VIEWS'

function renderedPage({ view }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#fcfcfc" />
        <title>FreeTools101</title>
        
        <meta property="og:title" content="FreeTools101" />
        <meta property="og:description" content="Explore free online calculators, finance tools, developer utilities, text tools, and converters. Fast, accurate, and available without registration." />
        <meta property="og:image" content="https://freetools101.onrender.com/favicon.ico" />
        <meta property="og:url" content="https://freetools101.onrender.com/" />
        
        <link rel="canonical" href="https://freetools101.onrender.com/" />
        <link rel="icon" href="https://freetools101.onrender.com/favicon.ico" />
        <link rel="apple-touch-icon" href="https://freetools101.onrender.com/icons/apple-touch-icon.png" />
        
        <meta property="og:site_name" content="FreeTools101" />
        <meta name="keywords" content="online calculators, free online calculators, finance calculator, mortgage calculator, loan calculator, investment calculator, compound interest calculator, EMI calculator, salary calculator, tax calculator, developer tools, JSON formatter, JSON validator, Base64 encoder, Base64 decoder, URL encoder, URL decoder, hash generator, UUID generator, text tools, word counter, character counter, case converter, regex tester, unit converter, currency converter, time converter, percentage calculator, scientific calculator, online utilities, free web tools, browser tools, productivity tools"/>
        <meta name="description" content="Explore free online calculators, finance tools, developer utilities, text tools, and converters. Fast, accurate, and available without registration." />
        
        <meta name="google-site-verification" content="qs3F3A8eq9KS1LvIRvlQ095Guvmxz34AAFET1OXGAUo" />
        <meta name="msvalidate.01" content="FFA5098A8C91061BC5977ACB65E24227" />
      </Head>
      <main
        style={{
          margin: '0px',
          width: '100vw',
          minHeight: '100vh'
        }}>
        <Dashboard view={view}/>
        <CustomAlert />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FreeTools101",
              url: "https://freetools101.onrender.com/",
              description:
                "Explore free online calculators, finance tools, developer utilities, text tools, and converters. Fast, accurate, and available without registration."
            })
          }}
        />
      </main>
    </div>
  )
}


export const getStaticPaths = async () => {
  const paths = VIEWS.map((view) => ({
    params: {
      slug: view.slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({
  params,
}) => {
  const view = VIEWS.find(
    (view) =>
      view.slug === params?.slug
  )

  if (!view) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const result = {
    id: view.id,
    slug: view.slug
  }

  return {
    props: {
      view: result
    }
  }
}

export default renderedPage