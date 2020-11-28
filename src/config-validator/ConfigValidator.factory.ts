import { ConfigValidator } from "./ConfigValidator"

export class ConfigValidatorFactory {
  public static make() {
    return new ConfigValidator()
  }
}
