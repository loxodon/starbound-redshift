import { IConfigValidator } from "./ConfigValidator.interface"

export class ConfigValidator implements IConfigValidator {
  public async validate(): Promise<void> {
    await this.validateStarboundLogFilePath()
  }

  private validateStarboundLogFilePath(): Promise<void> {
    return process.env.starbound_log_file_path
      ? Promise.resolve()
      : Promise.reject(
          new Error(
            "starbound_log_file_path has not been set in the config.json file!"
          )
        )
  }
}
