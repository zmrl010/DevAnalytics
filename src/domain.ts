import { api } from "./browser";
// import { LocalStorageController } from './packages/store/store'

const DOMAINS_KEY = 'domains'


class DomainSet extends Set<string> {
  toJSON() {
    return JSON.stringify([...this])
  }
  static make(initial?: string[]) {
    return new DomainSet(initial)
  }
}

// const domainController = new LocalStorageController<DomainSet>(DOMAINS_KEY, api)


export async function getDomains(): Promise<DomainSet> {
  const result = await api.storage.local.get(DOMAINS_KEY)
  return DomainSet.make(result[DOMAINS_KEY]);
}

export async function setDomains(domains: DomainSet): Promise<void> {
  return api.storage.local.set({ [DOMAINS_KEY]: domains.toJSON() })
}

/**
 * Verify that at least one domain exists
 */
export async function hasDomain(domain: string): Promise<boolean> {
  const domains = await getDomains()
  return domains.has(domain)
}

export async function addDomain(domain: string): Promise<void> {
  const domains = await getDomains()
  domains.add(domain)
  return setDomains(domains)
}

export async function deleteDomain(domain: string): Promise<void> {
  const domains = await getDomains()
  domains.delete(domain)
  return setDomains(domains)
}