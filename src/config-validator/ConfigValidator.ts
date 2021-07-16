import { IConfigValidator } from "./ConfigValidator.interface"

export class ConfigValidator implements IConfigValidator {
  public async validate(): Promise<void> {
    await this.validateStarboundLogFilePath()
  }

  private validateStarboundLogFilePath(): Promise<void> {
    return process.env.STARBOUND_LOG_FILE_PATH
      ? Promise.resolve()
      : Promise.reject(
          new Error(
            "STARBOUND_LOG_FILE_PATH has not been set in the .env file!"
          )
        )
  }
}
