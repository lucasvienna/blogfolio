import { useEffect, useRef } from 'react';

export default function ErrorPage() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardNodes = document.querySelectorAll<HTMLDivElement>('.card-container');
    const perspecNodes = document.querySelectorAll<HTMLDivElement>('.perspec');
    const perspec = document.querySelector('.perspec');
    const card = document.querySelector('.card');

    let counter = stackRef.current?.children.length ?? 0;

    // function to generate random number
    function randInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // after tilt animation, fire the explode animation
    card?.addEventListener('animationend', () => {
      perspecNodes.forEach((elem) => {
        elem.classList.add('explode');
      });
    });

    // after explode animation do a bunch of stuff
    perspec?.addEventListener('animationend', (e) => {
      if ((e as AnimationEvent).animationName === 'explode') {
        cardNodes.forEach((elem) => {
          // add hover animation class
          elem.classList.add('pokeup');

          // add event listner to throw card on click
          elem.addEventListener('click', () => {
            const updown = [800, -800];
            const randomY = updown[Math.floor(Math.random() * updown.length)];
            const randomX = Math.floor(Math.random() * 1000) - 1000;
            /* eslint-disable @typescript-eslint/no-unsafe-member-access,no-param-reassign */
            elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
            elem.style.transition = 'transform 1s ease, opacity 2s';
            elem.style.opacity = '0';
            counter -= 1;
            if (counter === 0 && stackRef.current) {
              stackRef.current.style.width = '0';
              stackRef.current.style.height = '0';
            }
            /* eslint-enable @typescript-eslint/no-unsafe-member-access,no-param-reassign */
          });

          // generate random number of lines of code between 4 and 10 and add to each card
          const numLines = randInt(5, 10);

          // loop through the lines and add them to the DOM
          for (let index = 0; index < numLines; index++) {
            const lineLength = randInt(25, 97);
            const node = document.createElement('li');
            node.classList.add(`node-${index}`);
            elem
              ?.querySelector('.code ul')
              ?.appendChild(node)
              .setAttribute('style', `--linelength: ${lineLength}%;`);

            // draw lines of code 1 by 1
            if (index === 0) {
              elem?.querySelector(`.code ul .node-${index}`)?.classList.add('writeLine');
            } else {
              elem
                ?.querySelector(`.code ul .node-${index - 1}`)
                ?.addEventListener('animationend', () => {
                  elem?.querySelector(`.code ul .node-${index}`)?.classList.add('writeLine');
                });
            }
          }
        });
      }
    });
  }, []);

  return (
    <div className="error-container">
      <div className="error">
        <h1>500</h1>
        <h2>error</h2>
        <p>
          Ruh-roh, something just isn&apos;t right... Time to paw through your logs and get down and
          dirty in your stack-trace ;)
        </p>
      </div>
      <div ref={stackRef} className="stack-container">
        {times(6, (i) => (
          <div key={i} className="card-container">
            <div className={`perspec perspec${i + 1}`}>
              <div className="card">
                <div className="writing">
                  <div className="topbar">
                    <div className="red" />
                    <div className="yellow" />
                    <div className="green" />
                  </div>
                  <div className="code">
                    <ul />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function times(i: number, cb: (index: number) => unknown) {
  const ret = [];
  for (let k = i; k > 0; k--) {
    ret.push(cb(i - k));
  }
  return ret;
}
