import { Provider } from '@nestjs/common'
import appInsights from 'applicationinsights'

export const TelemetryClientProvider: Provider = {
  provide: 'TelemetryClient',
  useFactory: () => {
    try {
      return new appInsights.TelemetryClient()
    } catch (error) {
      console.error(error)
    }
  },
}
