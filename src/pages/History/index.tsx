import { useContext, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

// type TFormValues = {
//   name: string;
//   sobrenome: string;
// }

export default function History() {
  const { cycles } = useContext(CyclesContext);
  // const [formValues, setFormValues] = useState<TFormValues>({} as TFormValues);

  // function handleChangeValues(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.currentTarget;

  //   setFormValues((current) => {
  //     return {
  //       ...current,
  //       [name]: value
  //     }
  //   })
  // };

  // function hadndleSubmit(ev: React.FormEvent<HTMLFormElement>) {
  //   ev.preventDefault();

  //   console.log(formValues)
  // }

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            {cycles?.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(new Date(cycle.startDate), { addSuffix: true, locale: ptBR })}</td>
                  <td>
                    {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}

                    {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}

                    {
                      !cycle.finishedDate && !cycle.interruptedDate &&
                      <Status statusColor="yellow">
                        Em andamento
                      </Status>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
      {/* <form onSubmit={hadndleSubmit}>
        <input
          placeholder="nome"
          value={formValues.name}
          name="name"
          onChange={handleChangeValues}
        />
        <input
          placeholder="sobrenome"
          value={formValues.sobrenome}
          name="lastName"
          onChange={handleChangeValues}
        />
        <button type="submit">enviar</button>
      </form> */}
    </HistoryContainer>
  )
}