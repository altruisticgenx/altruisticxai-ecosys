import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Info } from '@phosphor-icons/react'

interface GrantSearchResponse {
  totalRecords: number
  requestedAt: string
  opportunities: Array<{
    opportunityNumber: string
    opportunityTitle: string
    agencyName: string
    estimatedTotalProgramFunding?: number
  }>
}

export default function GrantsAPITest() {
  const [data, setData] = useState<GrantSearchResponse | null>(null)
  const [testing, setTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  const testAPI = async () => {
    setTesting(true)
    setError(null)
    setResult(null)

    try {
      const requestBody = {
        keyword: 'energy',
        oppStatuses: 'forecasted|posted',
        sortOrder: 'relevance',
        size: 3
      }

      const response = await fetch('https://api.grants.gov/v2/opportunities/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const json = await response.json()
      
      setData({
        totalRecords: json.totalRecords || json.total || 0,
        opportunities: json.opportunities || [],
        requestedAt: new Date().toISOString()
      })
      setResult('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setResult('error')
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info size={20} weight="duotone" className="text-primary" />
          Grants.gov API v2 Connection Test
        </CardTitle>
        <CardDescription>
          Test the live connection to{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            api.grants.gov/v2/opportunities/search
          </code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testAPI} disabled={testing} className="w-full">
          {testing ? 'Testing API Connection...' : 'Test API Connection'}
        </Button>

        {result === 'success' && data && (
          <Alert className="border-primary/30 bg-primary/5">
            <CheckCircle size={20} weight="duotone" className="text-primary" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">✅ API Connection Successful!</p>
                <div className="space-y-1 text-sm">
                  <p>Total grants in database: <strong>{data.totalRecords.toLocaleString()}</strong></p>
                  <p>Sample grants retrieved: <strong>{data.opportunities.length}</strong></p>
                  <p className="text-xs text-muted-foreground">
                    Tested at: {new Date(data.requestedAt).toLocaleString()}
                  </p>
                </div>
                {data.opportunities.length > 0 && (
                  <div className="mt-3 space-y-2 rounded-md border border-primary/20 bg-background p-3">
                    <p className="text-xs font-semibold text-foreground">Sample Grant:</p>
                    <div className="space-y-1 text-xs">
                      <p className="font-medium text-foreground">
                        {data.opportunities[0].opportunityTitle || 'N/A'}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {data.opportunities[0].agencyName || 'Unknown Agency'}
                        </Badge>
                        {data.opportunities[0].opportunityNumber && (
                          <Badge variant="outline" className="text-xs">
                            {data.opportunities[0].opportunityNumber}
                          </Badge>
                        )}
                      </div>
                      {data.opportunities[0].estimatedTotalProgramFunding && (
                        <p className="text-muted-foreground">
                          Funding: ${(typeof data.opportunities[0].estimatedTotalProgramFunding === 'number' 
                            ? data.opportunities[0].estimatedTotalProgramFunding 
                            : parseFloat(String(data.opportunities[0].estimatedTotalProgramFunding))
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {result === 'error' && (
          <Alert variant="destructive">
            <XCircle size={20} weight="duotone" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">❌ API Connection Failed</p>
                <p className="text-sm">{error}</p>
                <p className="text-xs text-muted-foreground">
                  This could be due to network issues, API downtime, or CORS restrictions.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">About This Test:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Sends a POST request to the official Grants.gov API v2</li>
            <li>Searches for grants with keyword "energy"</li>
            <li>Retrieves up to 3 sample results</li>
            <li>No API key required for public search endpoint</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
