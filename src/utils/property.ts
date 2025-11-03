const IS_PROD: boolean = import.meta.env.PROD;
const IS_SSR: boolean = import.meta.env.SSR;

export async function property() {
  let getPropertyValues: (key: string[]) => Promise<string[]>;

  if (IS_PROD && !IS_SSR) {
    // クライアントサイドでのみgas-clientを動的インポート
    const { GASClient } = await import('gas-client');
    const { serverFunctions } = new GASClient<{
      getPropertyValues: (key: string[]) => string[];
    }>();
    getPropertyValues = serverFunctions.getPropertyValues;
  }

  async function getProperties<const K extends string[]>(
    keys: K,
  ): Promise<{ [P in K[number]]: string }> {
    const properties = await getPropertyValues(keys);

    return Object.fromEntries(
      keys.map((key, index) => {
        const value = properties[index];

        if (value === '') {
          throw new Error(`プロパティ${key}の値が取得できませんでした`);
        }

        return [key, properties[index] ?? ''];
      }),
    ) as { [P in K[number]]: string };
  }

  return { getProperties };
}
