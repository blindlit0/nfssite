// Lightweight `cn` helper that supports strings, numbers, arrays and
// objects with boolean values (similar to `clsx` / `classnames`).
export function cn(
  ...inputs: Array<
    | string
    | number
    | boolean
    | null
    | undefined
    | { [key: string]: any }
    | Array<any>
  >
) {
  const classes: string[] = [];

  const push = (val: any) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      classes.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(push);
      return;
    }
    if (typeof val === "object") {
      for (const key of Object.keys(val)) {
        if ((val as any)[key]) classes.push(key);
      }
    }
  };

  inputs.forEach(push);
  return classes.join(" ");
}