import Head from 'next/head'
import Tools from '../../app/Pages/Tools'
import TOOL_LIST from '../../app/Pages/Tools/Constants/TOOL_LIST'
import CustomAlert from '../../app/Commons/CustomAlert'
import Script from 'next/script'

function renderedPage({ tool }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#fcfcfc" />
        <title>{`${tool.title.toString()} | FreeTools101`}</title>
        <meta property="og:title" content={`${tool.title} | FreeTools101`} />
        <meta property="og:description" content={tool.description} />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://freetools101.onrender.com/" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="online calculators, free online calculators, finance calculator, mortgage calculator, loan calculator, investment calculator, compound interest calculator, EMI calculator, salary calculator, tax calculator, developer tools, JSON formatter, JSON validator, Base64 encoder, Base64 decoder, URL encoder, URL decoder, hash generator, UUID generator, text tools, word counter, character counter, case converter, regex tester, unit converter, currency converter, time converter, percentage calculator, scientific calculator, online utilities, free web tools, browser tools, productivity tools"/>
        <meta name="description" content={tool.description} />
        <meta name="google-site-verification" content="qs3F3A8eq9KS1LvIRvlQ095Guvmxz34AAFET1OXGAUo" />
        <meta name="msvalidate.01" content="FFA5098A8C91061BC5977ACB65E24227" />
      </Head>
      <main style={{ margin: '0px', width: '100vw', minHeight: '100vh', backgroundColor: 'var(--p-bg-color)' }}>
        <Tools tool={tool} />
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
  const paths = TOOL_LIST.map((tool) => ({
    params: {
      category: tool.category.toLowerCase(),
      slug: tool.slug
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
  const tool = TOOL_LIST.find(
    (tool) =>
      tool.category.toLowerCase() === params?.category &&
      tool.slug === params?.slug
  )

  if (!tool) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const result = {
    title: tool.title,
    slug: tool.slug,
    description: tool.description,
    category: tool.category
  }

  return {
    props: {
      tool: result
    }
  }
}

export default renderedPage