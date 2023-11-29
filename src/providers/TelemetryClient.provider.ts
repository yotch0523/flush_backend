import { Provider } from '@nestjs/common'
import { defaultClient } from 'applicationinsights'

export const TelemetryClientProvider: Provider = {
  provide: 'TelemetryClient',
  useFactory: () => {
    try {
      return defaultClient
    } catch (error) {
      console.error(error)
    }
  },
}
