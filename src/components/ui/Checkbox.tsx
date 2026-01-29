import { Form } from 'react-bootstrap';
import { forwardRef } from 'react';

type CheckboxProps = React.ComponentProps<typeof Form.Check> & {
  indeterminate?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, ...props }, ref) => {
    return (
      <Form.Check
        {...props}
        ref={(el: HTMLInputElement | null) => {
          if (el) {
            el.indeterminate = Boolean(indeterminate);
          }

          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
